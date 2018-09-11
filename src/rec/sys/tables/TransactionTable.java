package rec.sys.tables;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class TransactionTable {
	
	public ArrayList<Transaction> transactions;
	
	public TransactionTable(ArrayList<Transaction> transactions)
	{
		this.transactions = new ArrayList<Transaction>();
	}
	
	public void storeTransactions(String transactionFile)
	{
		// This will reference one line at a time
        String line = null;

        try {
            // FileReader reads text files in the default encoding.
            FileReader fileReader = 
                new FileReader(transactionFile);

            // Always wrap FileReader in BufferedReader.
            BufferedReader bufferedReader = 
                new BufferedReader(fileReader);

            int transactionCounter = 0;
            while((line = bufferedReader.readLine()) != null) {
            	 Transaction t = new Transaction();
            	Scanner scanner = new Scanner(line);
            	System.out.println(line);
            	t.transactionNumber = transactionCounter++;
            	t.transactionSupport = scanner.nextInt();
            	ArrayList<Integer> transactions = new ArrayList<Integer>();
            	while(scanner.hasNextInt())
            	{
            		transactions.add(scanner.nextInt());
            	}
            	t.spriteItems = transactions;
            	this.transactions.add(t);
            }   

            // Always close files.
            bufferedReader.close();         
        }
        catch(FileNotFoundException ex) {
            System.out.println(
                "Unable to open file '" + 
                		transactionFile + "'");                
        }
        catch(IOException ex) {
            System.out.println(
                "Error reading file '" 
                + transactionFile + "'");                  
            // Or we could just do this: 
            // ex.printStackTrace();
        }
	}
	
	public static void main(String[] args) {
		TransactionTable tt = new TransactionTable(new ArrayList<>());
		tt.storeTransactions("recommender/tables/transactions.txt");
		ArrayList<Transaction> transactions = tt.transactions;
		for(Transaction t : transactions)
		{
			System.out.println(t.transactionNumber);
			System.out.println(t.transactionSupport);
			for (int i = 0; i < t.spriteItems.size(); i++) 
			{
				System.out.println(t.spriteItems.get(i));
			}
		}
	}

}
