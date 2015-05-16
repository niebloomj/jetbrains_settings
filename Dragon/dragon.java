import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class dragon {
	public static void main(String[] args) {

		Scanner scan = new Scanner(System.in);
		System.out.println("number of habitats?");
		Habitat[] habitats = new Habitat[scan.nextInt()];
		for (int i = 0; i < habitats.length; i ++) {
			System.out.println("First line amount, next line capacity");
			habitats[i] = new Habitat(scan.nextInt(), scan.nextInt());
		}
		System.out.println("number of dragons?");
		int[] dragons = new int[scan.nextInt()];
		System.out.println("Each line dragon earnings");
		for (int i = 0; i < dragons.length; i ++) {
			dragons[i] = scan.nextInt();
		}
		optimize(habitats, dragons);

		// habitats[0] = new Habitat(150000, 5);
		// habitats[1] = new Habitat(75000, 3);
		// habitats[2] = new Habitat(75000, 3);
		// habitats[3] = new Habitat(75000, 3);
		// habitats[4] = new Habitat(75000, 3);
		// optimize(habitats, 78, 46, 71, 137, 50, 48, 42, 46, 61, 33, 46, 58, 63);
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
		int ceiling = 1000;
		int runs = 0;
		int maxRuns = 10000000;
		while (true) {
			System.out.println("Ceiling = " + ceiling);
			do {
				if (runs > maxRuns)
					break;
				for (Habitat bin : bins)
					bin.wipeDragons();
				Collections.shuffle(dragonsOrders);
				int spot = 0;
				for (Habitat bin : bins) {
					while (!bin.isFull()) {
						bin.add(dragonsOrders.get(spot));
						spot ++;
					}
				}
				// System.out.println(howOptimized(bins));
				runs += 1;
			} while (howOptimized(bins) > ceiling);
			if (runs > maxRuns) {
				System.out.println("Too many runs");
				break;
			}
			System.out.println(dragonsOrders);
			for (Habitat bin : bins)
				System.out.println(bin.minutesToFill + " minutes at " + bin.rate);
			runs = 0;
			if (ceiling == 125)
				ceiling = 100;
			else if (ceiling == 100)
				ceiling = 80;
			else
				ceiling *= .5;
		}
		System.out.println(dragonsOrders);
		for (Habitat bin : bins)
			System.out.println(bin.minutesToFill + " minutes at " + bin.rate);
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