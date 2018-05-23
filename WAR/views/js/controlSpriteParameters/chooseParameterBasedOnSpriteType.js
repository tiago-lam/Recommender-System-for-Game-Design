/**
 * Created by tiagomachado on 5/21/18.
 */
function designSpecialTypesParameters(specialType, parameters)
{
    removeElements(specialParameters);

    if(specialType == ShootAvatar)
    {
        createShootAvatarParameters(parameters);
    }
    else if(specialType == FlakAvatar)
    {
        createFlakAvatarParameters();
    }
    else if(specialType == Flicker)
    {
        createFlickerParameter();
    }
    else if(specialType == OrientedFlicker)
    {
        createOrientedFlickerParameter();
    }
    else if(specialType == Chaser)
    {
        createChaserParameter();
    }
    else if(specialType == Fleeing)
    {
        createFleeingParameter();
    }
    else if(specialType == AlternateChaser)
    {
        createAlternateChaserParameter();
    }
    else if(specialType == RandomAltChaser)
    {
        createRandomAltChaserParameter();
    }
    else if(specialType == SpawnPoint)
    {
        createSpawnPoint();
    }
    else if(specialType == Bomber)
    {
        createBomber();
    }
    else if(specialType == RandomBomber)
    {
        createRandomBomber();
    }
    else if(specialType == Spreader)
    {
        createSpreader();
    }
    else if(specialType == Portal)
    {
        createPortal();
    }
    else if(specialType == Portal)
    {
        createPortal();
    }
    else if(specialType == Resource)
    {
        createResource();
    }

}