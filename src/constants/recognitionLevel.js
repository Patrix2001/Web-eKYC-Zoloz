const recognitionLevel = [
    {
        name: "IDRECOGNITION0002",
        description: "basic anti-spoofing, which only captures a normal photo of the document."
    },
    {
        name: "IDRECOGNITION0003",
        description: "flashlight anti-spoofing. This level shall only be used in native SDK, as web SDK has technical limitations in operating the flashlight. If it is used in web SDK, the behaviour is unpredictable."
    },
    {
        name: "IDRECOGNITION0005",
        description: "multi-angle anti-spoofing. This level shall only be used in web SDK, the behaviour is unpredictable when used in native SDK. As of now, this level only supports HK identity cards, other document types may be supported in future when needed."
    }
]

export default recognitionLevel;