package CodingProblems;

import java.util.*;

public class OptimizedUnitCounter {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter unit denominations separated by space: ");
        String[] unitStrings = scanner.nextLine().split(" ");
        int[] units = new int[unitStrings.length];
        for (int i = 0; i < unitStrings.length; i++) {
            units[i] = Integer.parseInt(unitStrings[i]);
        }

        System.out.print("Enter the maximum amount to check: ");
        int maxAmount = scanner.nextInt();

        int totalUnitsUsed = 0;

        for (int amount = 1; amount <= maxAmount; amount++) {
            int minUnits = getMinUnits(amount, units);
            System.out.println(amount + ": " + minUnits + " unit(s)");
            totalUnitsUsed += minUnits;
        }

        double averageUnits = (double) totalUnitsUsed / maxAmount;
        System.out.printf("Average number of units used: %.2f\n", averageUnits);
        scanner.close();
    }

    public static int getMinUnits(int amount, int[] units) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int unit : units) {
                if (i >= unit && dp[i - unit] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - unit] + 1);
                }
            }
        }

        return dp[amount];
    }
}

