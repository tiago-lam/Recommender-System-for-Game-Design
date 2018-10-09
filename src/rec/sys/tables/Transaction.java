package rec.sys.tables;

import java.util.ArrayList;

public class Transaction {
	
	public int transactionNumber;
	public int transactionSupport;
	public ArrayList<Integer> spriteItems;
	
	public Transaction(int transactionNumber, int transactionSupport, ArrayList<Integer> spriteItems)
	{
		this.transactionNumber = transactionNumber;
		this.transactionSupport = transactionSupport;
		this.spriteItems = spriteItems;
	}
	
	public Transaction()
	{
		
	}

}