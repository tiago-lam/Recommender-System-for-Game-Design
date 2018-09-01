package _._.jetty.server;

import java.util.Random;

import core.ArcadeMachine;

public class GameRun {
	
	String sampleRandomController = "controllers.singlePlayer.sampleRandom.Agent";
	String doNothingController = "controllers.singlePlayer.doNothing.Agent";
    String sampleOneStepController = "controllers.singlePlayer.sampleonesteplookahead.Agent";
    String sampleMCTSController = "controllers.singlePlayer.sampleMCTS.Agent";
    String sampleFlatMCTSController = "controllers.singlePlayer.sampleFlatMCTS.Agent";
    String sampleOLMCTSController = "controllers.singlePlayer.sampleOLMCTS.Agent";
    String sampleGAController = "controllers.singlePlayer.sampleGA.Agent";
    String sampleOLETSController = "controllers.singlePlayer.olets.Agent";
    String repeatOLETS = "controllers.singlePlayer.repeatOLETS.Agent";
    
    
    public void run(String game, String level)
    {
    	ArcadeMachine.playOneGame(game, level, null, new Random().nextInt());
    }
}
