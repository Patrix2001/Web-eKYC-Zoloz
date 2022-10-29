const realIdLevel = [
    {
        name: "REALID0001",
        description: "ZOLOZ SDK asks users to take the photos of the identity document manually. The ZOLOZ server performs basic spoofing check, and basic liveness check with the blink detection method used."
    },
    {
        name: "REALID0002",
        description: "the ZOLOZ SDK automatically scans the identity document. The ZOLOZ server performs advanced spoofing check, and basic liveness check with the blink detection method used."
    }
];

const operationMode = [
    {
        name: "CLOSED",
        description: "All the algorithms and risk control rules are not applied. You can use this operation mode in the test phase so that the algorithms and risk controls rules do not affect the test process."
    },
    {
        name: "STANDARD",
        description: "A standard recommended level is applied."
    },
    {
        name: "LOOSE",
        description: "A relatively looser level is applied. You can use this operation mode in low-risk scenarios."
    },
    {
        name: "STRICT",
        description: "A relatively stricter level is applied. You can use this operation mode in high-risk scenarios."
    }
];

export { realIdLevel, operationMode };