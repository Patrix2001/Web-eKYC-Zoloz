import { Fragment, useState } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import {
  captureLevel,
  docTypes,
  recognitionLevel,
  realIdLevel,
  operationMode
} from "../libraries";
import ButtonAction from "../components/ButtonAction";
import Dropdown from "../components/Dropdown";

const webFaceCapture =
  "https://sg-production-cdn.zoloz.com/page/zoloz-face-fe/index.html";

const webRealId =
  "https://sg-production-cdn.zoloz.com/page/zoloz-realid-fe/index.html";

const webIdRecognition =
  "https://sg-production-cdn.zoloz.com/page/zoloz-doc-fe/index.html";


const WEB_URL = "<name-domain>";

export default function Home() {
  const [imageContent, setImageContent] = useState("");
  const [secondImageContent, setSecondImageContent] = useState("");
  const [content, setContent] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [face, setFace] = useState("");
  const [real, setReal] = useState("");
  const [recognition, setRecognition] = useState("");
  const [operation, setOperation] = useState("");
  const [textDocType, setTextDocType] = useState("");

  const router = useRouter();
  const { response } = router.query;
  // console.log("response::", decodeURIComponent(response));

  const generateContent = (data) => {
    // Function display result from ZOLOZ
    const result = [];
    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        // extract information
        if (propName === "extInfo") {
          for (let info in data[propName]) {
            if (data[propName].hasOwnProperty(info)) {
              // set image
              if (info === "imageContent") {
                setImageContent(data[propName][info]);
                //set content
              } else if (info === "rect") {
                continue;
              } else {
                result.push([info, data[propName][info]]);
              }
            }
          }
        } else if (propName === "extFaceInfo") {
          for (let info in data[propName]) {
            if (data[propName].hasOwnProperty(info)) {
              // set image
              if (info === "faceImg") {
                setImageContent(data[propName][info]);
                //set content
              } else {
                result.push([info, data[propName][info]]);
              }
            }
          }
        } else if (propName === "extIdInfo") {
          for (let info in data[propName]) {
            if (data[propName].hasOwnProperty(info)) {
              if (info === "frontPageImg") {
                setSecondImageContent(data[propName][info]);
              } else {
                result.push([info, data[propName][info]]);
              }
            }
          }
        }
      }
    }
    setContent(result);
  };

  const generateData = (data) => {
    // function for generate data type object
    const result = [];
    for (let propName in data) {
      if (data.hasOwnProperty(propName)) {
        result.push([propName, data[propName]]);
      }
    }
    return result;
  };

  const faceCapture = async () => {
    try {
      const url = "/api/facecapture/initialize";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceLevel: face }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const state = data.transactionId;
      localStorage.setItem("transactionId", state);
      const clientcfg = data.clientCfg;
      router.push(
        `${webFaceCapture}?state=${state}&clientcfg=${encodeURIComponent(
          clientcfg
        )}&langPack=${encodeURIComponent(
          WEB_URL + "/api/config/facecapture"
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const faceResult = async () => {
    try {
      const state = localStorage.getItem("transactionId");
      const url = "/api/facecapture/result";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: state }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      generateContent(data);
    } catch (error) {
      alert("You don't have capture your face");
      console.log(error);
    }
  };

  const idInit = async () => {
    try {
      const url = "/api/idrecognition/initialize";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docType: documentType, serviceLevel: recognition }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const state = data.transactionId;
      localStorage.setItem("transactionId", state);
      const clientcfg = data.clientCfg;
      router.push(
        `${webIdRecognition}?state=${state}&clientcfg=${encodeURIComponent(
          clientcfg
        )}&langPack=${encodeURIComponent(
          WEB_URL + "/api/config/idrecognize"
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const idResult = async () => {
    try {
      const state = localStorage.getItem("transactionId");
      const url = "/api/idrecognition/result";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: state }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      generateContent(data);
    } catch (error) {
      alert("You don't have scan ID");
      console.log(error);
    }
  };

  const realId = async () => {
    try {
      const url = "/api/realid/initialize";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docType: documentType, serviceLevel : real, operationMode : operation }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const state = data.transactionId;
      localStorage.setItem("transactionId", state);
      const clientcfg = data.clientCfg;
      router.push(
        `${webRealId}?state=${state}&clientcfg=${encodeURIComponent(
          clientcfg
        )}&langPack=${encodeURIComponent(WEB_URL + "/api/config/realid")}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const realIdResult = async () => {
    try {
      const state = localStorage.getItem("transactionId");
      const url = "/api/realid/result";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: state }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      generateContent(data);
    } catch (error) {
      alert("You don't take eKYC Process");
      console.log(error);
    }
  };
  return (
    <>
      <div className="pb-6">
        <Menu>
          <Menu.Button className="w-full bg-blue-700 rounded-md hover:bg-blue-800 px-4 py-2 text-md font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
            {textDocType ? textDocType : "Document"}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-5 right-5 h-80 overflow-y-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {docTypes.map((arr, idx) => (
                  <Menu.Item key={idx}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`${active && "bg-blue-200"
                          } group w-full flex items-center rounded-md py-2 text-sm pl-4`}
                        onClick={() => {
                          setTextDocType(arr.document);
                          setDocumentType(arr.docType);
                        }}
                      >
                        {`${arr.document} (${arr.country})`}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* Face Capture */}
      <section>
        <h1 className="text-3xl text-center pb-8 font-bold">Face ID</h1>
        <Dropdown text="Service Level" data={captureLevel} action={(level) => setFace(level)} />
        <div className="flex flex-wrap mb-6">
          <ButtonAction text="Face ID" action={() => face ? faceCapture() : alert("Fill the Service Level")} />
          <ButtonAction text="Check Result Face ID" action={faceResult} />
        </div>
      </section>
      {/* Face Capture */}
      {/* ID Recognition */}
      <section>
        <h1 className="text-3xl text-center pb-8 font-bold">ID Recognition</h1>
        <Dropdown text="Service Level" data={recognitionLevel} action={(level) => setRecognition(level)} />
        <div className="flex flex-wrap gap-6 mb-6">
          <ButtonAction text="ID Recognition" action={() => documentType ? recognition ? idInit() : alert("Fill the Service Level") : alert("Fill the Document Type")} />
          <ButtonAction text="Check Result ID Recognition" action={idResult} />
        </div>
      </section>
      {/* ID Recognition */}
      {/* Real ID */}
      <section>
        <h1 className="text-3xl text-center pb-8 font-bold">eKYC</h1>
        <Dropdown text="Service Level" data={realIdLevel} action={(level) => setReal(level)} />
        <Dropdown text="Operation" data={operationMode} action={(level) => setOperation(level)} />
        <div className="flex flex-wrap gap-6 mb-6">
          <ButtonAction text="eKYC" action={() => documentType ? real ? operation ? realId() : alert("Fill the Operation") : alert("Fill the Service Level") : alert("Fill the Document Type")} />
          <ButtonAction text="Check Result eKYC" action={realIdResult} />
        </div>
      </section>
      {/* Real ID */}
      <article className="font-semibold">
        <h1 className="text-3xl text-center pb-4">Result</h1>
        <div className="pb-6 flex flex-wrap">
          {imageContent ? (
            <img
              src={`data:image/png;base64,${imageContent}`}
              className="mx-auto"
            />
          ) : (
            ""
          )}
          {secondImageContent ? (
            <img
              src={`data:image/png;base64,${secondImageContent}`}
              className="mx-auto"
            />
          ) : (
            ""
          )}
        </div>
        {content.length != 0
          ? content.map((arr, idx) => (
            <div key={idx}>
              <p>
                {arr[0].toString()} :{" "}
                {typeof arr[1] === "object" ? (
                  <table>
                    <tbody>
                      {generateData(arr[1]).map((data, id) => (
                        <tr className="font-normal" key={id}>
                          <td className="pr-6">{data[0]}</td>
                          <td>{data[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  arr[1].toString()
                )}
              </p>
            </div>
          ))
          : ""}
      </article>
      <div className="py-40" />
    </>
  );
}
