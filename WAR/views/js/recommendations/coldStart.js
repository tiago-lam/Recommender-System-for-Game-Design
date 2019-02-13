var coldStart = [
    {
    "specialized": null,
    "game": "witnessprotection",
    "common": {
        "identifier": "avatar",
        "children": [],
        "gameItBelongsTo": "witnessprotection",
        "parameters": {
            "img": "newset/cop1",
            "healthPoints": "5",
            "stype": "bullet"
        },
        "referenceClass": "ShootAvatar"
    },
    "confidence": 0.2641770401106501,
    "type": "ShootAvatar",
    "stypes": [
        {
            "identifier": "bullet",
            "children": [],
            "gameItBelongsTo": "witnessprotection",
            "parameters": {
                "img": "oryx/orb3",
                "shrinkfactor": "0.5"
            },
            "referenceClass": "Missile"
        }
    ]
    },

    {
        "specialized": null,
        "game": "aliens",
        "common": {
            "identifier": "avatar",
            "children": [],
            "gameItBelongsTo": "aliens",
            "parameters": {
                "img": "oryx/spaceship1",
                "stype": "sam"
            },
            "referenceClass": "FlakAvatar"
        },
        "confidence": 0.2641770401106501,
        "type": "FlakAvatar",
        "stypes": [
            {
                "identifier": "sam",
                "children": [],
                "gameItBelongsTo": "aliens",
                "parameters": {
                    "orientation": "UP",
                    "img": "oryx/bullet1"
                },
                "referenceClass": "Missile"
            }
        ]
    },

    {
        "specialized": null,
        "game": "whackamole",
        "common": {
            "identifier": "avatar",
            "children": [],
            "gameItBelongsTo": "whackamole",
            "parameters": {
                "img": "oryx/cyclop1"
            },
            "referenceClass": "MovingAvatar"
        },
        "confidence": 0.24481327800829875,
        "type": "MovingAvatar",
        "stypes": []
    }];

function coldStartRecommendations()
{
    createReccomendationList(coldStart);
}
