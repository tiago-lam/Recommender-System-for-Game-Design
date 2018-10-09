package rec.sys.tables;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;

public class TransactionTable {
	
	public ArrayList<Transaction> transactions;
	
	public TransactionTable()
	{
		this.transactions = new ArrayList<Transaction>();
		storeTransactions("recommender/tables/transactions.txt");
	}
	
	public void storeTransactions(String transactionFile)
	{
        String line = null;

        try {
           
            FileReader fileReader = new FileReader(transactionFile);

           
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            int transactionCounter = 0;
            while((line = bufferedReader.readLine()) != null) {
            	Transaction t = new Transaction();
            	Scanner scanner = new Scanner(line);
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
            
        }
	}
	
	public static void main(String[] args) {
		TransactionTable tt = new TransactionTable();
		tt.storeTransactions("recommender/tables/transactions.txt");
		ArrayList<Transaction> transactions = tt.transactions;
		for(Transaction t : transactions)
		{
			System.out.println(t.transactionNumber);
			System.out.println(t.transactionSupport);
			for (Integer i : t.spriteItems) 
			{
				System.out.println(i);
			}
		}
	}

}