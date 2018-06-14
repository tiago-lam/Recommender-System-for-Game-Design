/**
 * Created by tiagomachado on 5/21/18.
 */

/**
 * Selects the correct creator method to apply to the specified reference class
 * @param specialType(referenceClass)
 * @param parameters
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
        createFlakAvatarParameters(parameters);
    }
    else if(specialType == Flicker)
    {
        createFlickerParameter(parameters);
    }
    else if(specialType == OrientedFlicker)
    {
        createOrientedFlickerParameter(parameters);
    }
    else if(specialType == Chaser)
    {
        createChaserParameter(parameters);
    }
    else if(specialType == Fleeing)
    {
        createFleeingParameter(parameters);
    }
    else if(specialType == AlternateChaser)
    {
        createAlternateChaserParameter(parameters);
    }
    else if(specialType == RandomPathAltChaser)
    {
        createRandomAltChaserParameter(parameters);
    }
    else if(specialType == SpawnPoint)
    {
        createSpawnPoint(parameters);
    }
    else if(specialType == Bomber)
    {
        createBomber(parameters);
    }
    else if(specialType == RandomBomber)
    {
        createRandomBomber(parameters);
    }
    else if(specialType == Spreader)
    {
        createSpreader(parameters);
    }
    else if(specialType == Portal)
    {
        createPortal(parameters);
    }
    else if(specialType == Resource)
    {
        createResource(parameters);
    }

}