import React from "react";

const UploadProductImg = (props) => {
  return (
    <div>
      <div className="row my-3 text-center justify-content-center">
        <div className="upload-image-product col-12">
          <label>
            <input
              multiple
              type="file"
              name="URL_IMG"
              style={{ display: "none" }}
              onChange={props.onChange}
            />
            <i className="bi bi-cloud-arrow-up"></i>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadProductImg;
