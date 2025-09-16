<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CantorQuoteDto;
use App\Exception\UnsupportedOperationException;
use App\Value\CurrencyCode;
use App\Value\TradeSide;

final class CantorPricingService
{
    public function __construct(private readonly NbpClient $nbpClient)
    {
    }

    public function quote(string $code, TradeSide $side, \DateTimeInterface $date): CantorQuoteDto
    {
        $currency = CurrencyCode::fromString($code);
        $rate = $this->nbpClient->getSingleRateA($currency->value, $date);

        $price = match ($currency) {
            CurrencyCode::EUR, CurrencyCode::USD => match ($side) {
                TradeSide::BUY => $rate->mid - 0.15,
                TradeSide::SELL => $rate->mid + 0.11,
            },
            CurrencyCode::CZK, CurrencyCode::IDR, CurrencyCode::BRL => match ($side) {
                TradeSide::SELL => $rate->mid + 0.2,
                TradeSide::BUY => throw new UnsupportedOperationException(sprintf('BUY not supported for %s', $currency->value)),
            },
        };

        return CantorQuoteDto::fromRate($rate, $side, $price);
    }
}


