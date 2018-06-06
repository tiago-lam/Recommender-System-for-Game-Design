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

function updateAllSpecialParams(obj)
{
    //for all the spcial params
    //check if any of them belongs to this obj
    //if they do
    //for each one of them check if the parent already have them
    //if it does
    //block (disable) changes in this object
    //otherwise update the val of the parameter
    //and for each children, pass the param value of the parent
}