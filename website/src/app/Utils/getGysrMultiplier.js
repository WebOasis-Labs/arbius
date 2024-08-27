export function gysrBonus(gysr, amount, total, ratio) {
    const GYSR_PROPORTION = 1e16;
    if (amount === 0 || total === 0) {
        return 0;
    }
    if (gysr === 0) {
        return 1e18;
    }

    // scale GYSR amount with respect to proportion
    let portion = (GYSR_PROPORTION * total) / 1e18;
    if (amount > portion) {
        gysr = (gysr * portion) / amount;
    }

    // 1 + gysr / (0.01 + ratio)
    let x = 2 ** 64 + (2 ** 64 * gysr) / (1e16 + ratio);

    // JavaScript doesn't have a built-in function for logarithm base 10, 
    // so we use the change of base formula: log_b(a) = log_c(a) / log_c(b)
    // Here we use the natural logarithm (base e) as the base c.
    return 1e18 + ((Math.log(x) / Math.log(10)) * 1e18) / 2 ** 64;
}