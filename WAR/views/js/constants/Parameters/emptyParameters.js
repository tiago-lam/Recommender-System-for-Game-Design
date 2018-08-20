/**
 *
 */

/**
 * Serves Flicker and Oriented Flicker types
 * @type {{limit: string}}
 */
const ShootAvatarParamList = {stype: "none", ammo: "none"};

const FlickerParamList = {limit: "1"};

const ChaserParamList = {stype: "none"};

const FleeingParamList = {stype: "none"};

const AlternateChaserParamList = {stype1: "none", stype2: "none"};

const RandomAltChaserParamList = {stype1: "none", stype2: "none", prob: "0.0"};

const SpawnPointParamList = {stype: "none", total: "0", prob: "0.0", spawnorientation: "none"};

const BomberParamList = {stype: "none", total: "0", prob: "0.0", spawnorientation: "none"};

const RandomBomberParamList = {stype: "none", total: "0", prob: "0.0", spawnorientation: "none"};

/**
 * todo
 */
//const BomberRandomMissileParamList = {stypeMissile: "", total: "", prob: "", spawnorientation: ""};

const SpreaderParamList = {stype: "none",spreadprob: "0.0"};

const PortalParamList = {stype: "none"};

const ResourceParamList = {resource: "none", value: "0", limit: "1"};

const mapReferenceToItsParameters = new Map();

const mapParameterToItsDefaultValue = new Map();

function getCorrectListOfEmptyParameters(refClass)
{
    if(refClass == ShootAvatar) {
        return ShootAvatarParamList;
    }
    if(refClass == Flicker) {
        return FlickerParamList
    }
    else if(refClass == Chaser)
    {
        return ChaserParamList;
    }
    else if(refClass == Fleeing)
    {
        return FleeingParamList;
    }
    else if(refClass == AlternateChaser)
    {
        return AlternateChaserParamList;
    }
    else if(refClass == RandomPathAltChaser)
    {
        return RandomAltChaserParamList;
    }
    else if(refClass == SpawnPoint)
    {
        return SpawnPointParamList;
    }
    else if(refClass == Bomber)
    {
        return BomberParamList;
    }
    else if(refClass == RandomBomber)
    {
        return RandomBomberParamList;
    }
    else if(refClass == Spreader)
    {
        return SpreaderParamList;
    }
    else if(refClass == Portal)
    {
        return PortalParamList;
    }
    else if(refClass == Resource)
    {
        return ResourceParamList;
    }
}

//obj type (ref class) and parameters
function returnParametersOfThisReference(ref)
{
    if(ref == ShootAvatar)
    {
        return ["stype", "ammo"];
    }

    else if(ref == FlakAvatar)
    {
        return ["stype", "ammo", "minAmmo", "ammoCost"];
    }

    else if(ref == Flicker)
    {
        return ["limit"];
    }

    else if(ref == Chaser)
    {
        return ["stype"];
    }

    else if(ref == Fleeing)
    {
        return ["stype"];
    }

    else if(ref == AlternateChaser)
    {
        return ["stype1", "stype2"];
    }

    else if(ref == RandomPathAltChaser)
    {
        return ["stype1", "stype2", "prob"];
    }

    else if(ref == SpawnPoint)
    {
        return ["stype", "total", "prob", "spawnorientation"];
    }

    else if(ref == Bomber)
    {
        return ["stype", "total", "prob", "spawnorientation"];
    }

    else if(ref == RandomBomber)
    {
        return ["stype", "total", "prob", "spawnorientation"];
    }

    else if(ref == Spreader)
    {
        return ["stype", "spreadprob"];
    }

    else if(ref == Portal)
    {
        return ["stype"];
    }

    else if(ref == Resource)
    {
        return ["value", "limit"];
    }

    else
    {
        return [];
    }
}

function returnDefaultValuesOfThisParameter(param)
{
    if(param == "ammo")
    {
        return "none";
    }
    else if(param == "minAmmo")
    {
        return "0";
    }
    else if(param == "ammoCost")
    {
        return "1";
    }
    else if(param == "stype")
    {
        return "none";
    }
    else if(param == "stype1")
    {
        return "none";
    }
    else if(param == "stype2")
    {
        return "none";
    }
    else if(param == "prob")
    {
        return "0.0";
    }
    else if(param == "total")
    {
        return "0";
    }
    else if(param == "spawnorientation")
    {
        return "none";
    }
    else if(param == "spreadprob")
    {
        return "0.0";
    }
    else if(param == "value")
    {
        return "0";
    }
    else if(param == "limit")
    {
        return "1";
    }
    // else if(param == "resource")
    // {
    //     return "none";
    // }

}



