import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import gh from "parse-github-url";
import "./App.css";

const App = () => {
  const [gitUrl, setGitUrl] = useState(window.location.href);
  const [gitDetail, setGitDetail] = useState(null);

  useEffect(() => {
    let gitDetail = gh(gitUrl);
    setGitDetail(gitDetail);
  }, [gitUrl]);

  useEffect(() => {
    setGitUrl(window.location.href);
  }, [window.location.href]);

  const cleanGitUrl = () => {
    return gitUrl.replace(/(^\w+:|^)\/\//, "");
  };

  return (
    <div class="btn-editor-by-arryangga ml-2">
      <div className="buttonArea">
        <div className="ripple"></div>
      </div>
      <svg
        class="icons"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        ></path>
      </svg>

      <span>Editor</span>

      <ul class="dropdown">
        <li>
          <a
            href={gitUrl.replace("github.com", "github1s.com")}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Open in Editor"
              src="https://raw.githubusercontent.com/conwnet/github1s/master/resources/images/logo.svg"
            />{" "}
            Github1s
          </a>
        </li>
        <li>
          <a
            href={`https://codesandbox.io/s/${cleanGitUrl().replace(
              ".com",
              ""
            )}`}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Open in Editor"
              src="https://raw.githubusercontent.com/feathericons/feather/04d37dc6b1afae4a8e5ed8417fe9ceba14c968c9/icons/codesandbox.svg"
            />
            CodeSandbox
          </a>
        </li>
        <li>
          <a
            href={`https://gitpod.io/#${gitUrl}`}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Open in Editor"
              src="https://symbols.getvecta.com/stencil_81/52_gitpod-icon.20f12c5be8.svg"
            />
            Gitpod
          </a>
        </li>
        {gitDetail && (
          <li>
            <a
              href={`https://repl.it/github/${gitDetail.repo}`}
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="Open in Editor"
                src="https://replit.com/public/images/sm.png"
              />
              Repl.it
            </a>
          </li>
        )}
        {gitDetail && (
          <li>
            <a
              href={`vscode://vscode.git/clone?url=https://github.com/${gitDetail.repo}`}
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="Open in Editor"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png"
              />
              VSCode
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

window.onload = function () {
  let container = document.querySelector("div.file-navigation");

  if (container) {
    let pluginArea = document.createElement("div");
    render(<App />, pluginArea);
    container.appendChild(pluginArea);
  }
};
