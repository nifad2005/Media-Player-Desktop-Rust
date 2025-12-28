import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";

let videoPlayer: HTMLVideoElement | null;
let openFileButton: HTMLButtonElement | null;
let currentFileDisplay: HTMLParagraphElement | null;

async function openVideoFile() {
  if (!videoPlayer || !currentFileDisplay) {
    console.error("Video player or current file display element not found.");
    return;
  }

  // Open a file dialog to select a video file
  const selected = await open({
    multiple: false,
    filters: [
      {
        name: "Video",
        extensions: ["mp4", "mov", "webm", "mkv", "avi"], // Common video extensions
      },
    ],
  });

  if (selected && typeof selected === "string") {
    // `selected` is a string that contains the path to the selected file
    const assetUrl = convertFileSrc(selected);
    videoPlayer.src = assetUrl;
    videoPlayer.play();

    // Display the file name
    const fileName = selected.split(/["\/"]/).pop(); // Extract file name from path
    currentFileDisplay.textContent = `Now playing: ${fileName}`;
  } else {
    currentFileDisplay.textContent = "No file selected.";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  videoPlayer = document.querySelector("#videoPlayer");
  openFileButton = document.querySelector("#openFileButton");
  currentFileDisplay = document.querySelector("#currentFile");

  openFileButton?.addEventListener("click", () => {
    openVideoFile();
  });
});