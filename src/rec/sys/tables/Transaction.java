package rec.sys.tables;

import java.util.List;

public class Transaction {
	
	public int transactionNumber;
	public int transactionSupport;
	public List<Integer> spriteItems;
	
	public Transaction(int transactionNumber, int transactionSupport, List<Integer> spriteItems)
	{
		this.transactionNumber = transactionNumber;
		this.transactionSupport = transactionSupport;
		this.spriteItems = spriteItems;
	}
	
	public Transaction()
	{
		
	}

}