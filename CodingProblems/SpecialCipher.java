package CodingProblems;

import java.util.Scanner;

public class SpecialCipher {

    public static String specialCipher(String input, int rotation) {
        
        StringBuilder caesar = new StringBuilder();
        for (char ch : input.toCharArray()) {
            char rotated = (char) ((ch - 'A' + rotation) % 26 + 'A');
            caesar.append(rotated);
        }

        StringBuilder rle = new StringBuilder();
        int count = 1;
        for (int i = 1; i < caesar.length(); i++) {
            if (caesar.charAt(i) == caesar.charAt(i - 1)) {
                count++;
            } else {
                rle.append(caesar.charAt(i - 1));
                if (count > 1) rle.append(count);
                count = 1;
            }
        }
        rle.append(caesar.charAt(caesar.length() - 1));
        if (count > 1) rle.append(count);

        return rle.toString();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the string (uppercase only): ");
        String input = scanner.nextLine().toUpperCase();

        System.out.print("Enter the Caesar rotation (integer): ");
        int rotation = scanner.nextInt();

        String result = specialCipher(input, rotation);
        System.out.println("Encoded Output: " + result);

        scanner.close();
    }
}
