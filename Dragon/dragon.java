import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class dragon {
	public static void main(String[] args) {

		File file = new File("dragon.txt");
		try {
			Scanner sc = new Scanner(file);
			while (sc.hasNext()) {
				Habitat[] habitats = new Habitat[sc.nextInt()];
				for (int i = 0; i < habitats.length; i ++)
					habitats[i] = new Habitat(sc.nextInt(), sc.nextInt());
				int[] dragons = new int[sc.nextInt()];
				String line = sc.next();
				String[] lines = line.split(",");
				for (int i = 0; i < lines.length; i ++)
					dragons[i] = Integer.parseInt(lines[i]);
				optimize(habitats, dragons);
				System.out.println(sc.next());
				System.out.println("\n\n\n\n\n\n\n\n\n\n\n\n");
			}
			sc.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static void optimize(Habitat[] bins, int[] dragons) {
		int numberOfSpots = 0;
		for (Habitat bin : bins)
			numberOfSpots += bin.cap;
		ArrayList<Integer> dragonsOrders = new ArrayList<Integer>();
		for (int i = 0; i < numberOfSpots; i ++) {
			if (dragons.length > i)
				dragonsOrders.add(dragons[i]);
			else
				dragonsOrders.add(0);
		}
		int runs = 0;
		int maxRuns = 1000000;
		int bestScore = Integer.MAX_VALUE;
		do {
			if (runs > maxRuns)
				break;
			for (Habitat bin : bins)
				bin.wipeDragons();
			Collections.shuffle(dragonsOrders);
			int spot = 0;
			for (Habitat bin : bins)
				while (!bin.isFull()) {
					bin.add(dragonsOrders.get(spot));
					spot ++;
				}
			runs += 1;
			if (howOptimized(bins) < bestScore) {
				bestScore = howOptimized(bins);
				System.out.println("Score = " + bestScore);
				System.out.println(dragonsOrders);
				for (Habitat bin : bins)
					System.out.println(bin.minutesToFill + " minutes at " + bin.rate);
			}
		} while (true);
	}

	public static int howOptimized(Habitat[] bins) {
		int[] minutesToFillArr = new int[bins.length];
		for (int i = 0; i < bins.length; i ++)
			minutesToFillArr[i] = bins[i].minutesToFill;
		int min = minutesToFillArr[0];
		int max = minutesToFillArr[0];
		for (int i = 0; i < bins.length; i ++) {
			if (minutesToFillArr[i] < min)
				min = minutesToFillArr[i];
			else if (minutesToFillArr[i] > max)
				max = minutesToFillArr[i];
		}
		return Math.abs(max - min);
	}
}

class Habitat {
	public int cap;
	public int amount;
	public int dragonNum;
	public int rate;
	public int minutesToFill;

	public Habitat(int amount, int cap) {
		this.cap = cap;
		this.amount = amount;
		wipeDragons();
	}

	public void add(int dragon) {
		if (dragonNum < cap) {
			if (dragon == 0) {
				dragonNum += 1;
				return;
			}
			rate = rate + dragon;
			dragonNum ++;
			int hypAmt = 0;
			minutesToFill = 0;
			while (hypAmt < amount) {
				minutesToFill++;
				hypAmt += rate;
			}
		}
	}

	public void wipeDragons() {
		dragonNum = 0;
		rate = 0;
		minutesToFill = 0;
	}

	public boolean isFull() {
		if (dragonNum < cap)
			return false;
		else
			return true;
	}
}