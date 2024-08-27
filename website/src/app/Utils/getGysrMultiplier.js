export function gysrBonus(gysr, amount, total, ratio) {
    if (amount == 0) {
        return 0;
    }
    if (total == 0) {
        return 0;
    }
    if (gysr == 0) {
        return 1e18;
    }

    // scale GYSR amount with respect to proportion
    const GYSR_PROPORTION = 1e18; // Assuming GYSR_PROPORTION is defined as 1e18
    const portion = (GYSR_PROPORTION * total) / 1e18;
    if (amount > portion) {
        gysr = (gysr * portion) / amount;
    }

    // 1 + gysr / (0.01 + ratio)
    const x = 2 ** 64 + ((2 ** 64 * gysr) / (1e16 + ratio));
    console.log(x, "X", Math.log10(x))
    return 1e18 + (Math.log10(x) * 1e18) / (2 ** 64)
}
