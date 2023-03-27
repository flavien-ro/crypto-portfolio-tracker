import NextImage from "next/image";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const checkImage = (path) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ path, status: "ok" });
    img.onerror = () => resolve({ path, status: "error" });

    img.src = path;
  });

const getImgUrl = (imageUrl) => {
  if (!imageUrl) return false;

  if (!imageUrl.includes("ipfs://")) {
    return imageUrl;
  } else {
    return "https://ipfs.io/ipfs/" + imageUrl.substring(7);
  }
};

function isValidVideoUrl(url) {
  // Regular expressions to match YouTube, Vimeo, and mp4 URLs
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]{11})$/;
  const vimeoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)$/;
  const mp4Regex = /^(?:https?:\/\/.*\/)?(.+)\.mp4$/;

  // Check if the URL matches the YouTube, Vimeo, or mp4 regex
  if (youtubeRegex.test(url) || vimeoRegex.test(url) || mp4Regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

const RenderNFT = ({ NFTimage, name }) => {
  const [render, setRender] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const verifyImage = async () => {
      const path = getImgUrl(NFTimage);

      if (!path) {
        setRender("error");
      } else {
        const { path: url, status } = await checkImage(path);
        setImageUrl(url);
        setRender(status);
      }
    };
    verifyImage();
  }, [NFTimage]);

  return (
    <>
      {render === "ok" && imageUrl?.length > 0 ? (
        <NextImage
          src={imageUrl}
          width={180}
          height={180}
          alt={name}
          style={{ objectFit: "contain", borderRadius: "20px" }}
        />
      ) : isValidVideoUrl(NFTimage) ? (
        <video
          style={{ width: "180px", height: "180px" }}
          src={NFTimage}
          loop
          autoplay
        ></video>
      ) : (
        <div
          style={{
            width: "180px",
            height: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray",
            borderRadius: "20px",
          }}
        >
          <Typography variant="body2">Unsupported content</Typography>
        </div>
      )}
    </>
  );
};

export default RenderNFT;
