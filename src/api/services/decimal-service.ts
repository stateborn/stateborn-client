import Decimal from 'decimal.js';

export const toPreciseDecimal = (value: number): Decimal => {
    return new Decimal(value);
}
