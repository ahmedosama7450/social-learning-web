import Cropper from "cropperjs";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";

import {
  DialogReactNode,
  IconButton,
  TypicalDialog,
  TypicalVerticalDivider,
} from "../..";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { ImageCropper } from "./ImageCropper";

export type CropData = Omit<Cropper.Data, "rotate">;

type ResultDataType = { src: string; cropData?: CropData } | undefined;

export type ImageCropperDialogProps = {
  children: DialogReactNode<ResultDataType>;
  onCropped: (result: NonNullable<ResultDataType>) => void;
};

export const ImageCropperDialog = ({
  children,
  onCropped,
}: ImageCropperDialogProps) => {
  const { t } = useTranslation();

  const cropperRef = useRef<Cropper>();
  const [src, setSrc] = useState<string>();
  const [initialCropData, setInitialCropData] = useState<CropData>();

  const [aspect, setAspect] = useState(0);

  return (
    <TypicalDialog<ResultDataType>
      autoClose={false}
      size="lg"
      fullScreenOnMobile={true}
      resultDataHandler={{
        resultData: src ? { src, cropData: initialCropData } : undefined,

        setResultData: (resultData) => {
          if (resultData) {
            setSrc(resultData.src);
            setInitialCropData(resultData.cropData);
          } else {
            setSrc(undefined);
            setInitialCropData(undefined);
          }
        },
      }}
      onToggle={(ds) => {
        if (ds.isOpen) {
          ds.resultDataHandler?.setResultData(undefined);
        }
      }}
      headerProps={{
        title: t("common:cropper.title"),
      }}
      footerProps={{
        positiveButton: {
          text: t("common:apply"),
          listener: async (ds) => {
            if (src) {
              const data = cropperRef.current?.getData();

              onCropped({
                src,
                cropData: data
                  ? {
                      x: data.x,
                      y: data.y,
                      width: data.width,
                      height: data.height,
                      scaleX: data.scaleX,
                      scaleY: data.scaleY,
                    }
                  : undefined,
              });
            } else {
              // TODO: Toast error
            }

            ds.toggle();
          },
        },
        negativeButton: { text: t("common:cancel") },
      }}
      content={() => (
        <div>
          <div className="bg-gray-100 px-4 py-4">
            <ImageCropper
              className="md:h-84 lg:h-92 h-80"
              cropperRef={cropperRef}
              src={src}
              aspectRatio={aspect === 0 ? NaN : aspect}
              ready={() => {
                cropperRef.current?.setData(initialCropData || {}); // TODO Does empty object passed reset cropper ?
              }}
            />
          </div>

          <div className="flex max-w-full items-center justify-center">
            <div className="flex items-center justify-between gap-3.5 px-4 py-4">
              <ButtonGroup
                value={aspect}
                onChange={setAspect}
                options={[
                  {
                    text: t("common:cropper.aspect-buttons.none"),
                    value: 0,
                  },
                  {
                    text: t("common:cropper.aspect-buttons.wide"),
                    value: 16 / 9,
                  },
                  {
                    text: t("common:cropper.aspect-buttons.square"),
                    value: 1,
                  },
                ]}
              />

              <TypicalVerticalDivider />

              <IconButton
                type="button"
                iconProps={{ icon: "mdi:flip-horizontal", size: "md" }}
                color="darkGray"
                onClick={() => {
                  cropperRef.current?.scaleX(
                    -cropperRef.current?.getData().scaleX || -1
                  );
                }}
              />

              <IconButton
                type="button"
                iconProps={{ icon: "mdi:flip-vertical", size: "md" }}
                color="darkGray"
                onClick={() => {
                  cropperRef.current?.scaleY(
                    -cropperRef.current?.getData().scaleY || -1
                  );
                }}
              />

              <TypicalVerticalDivider />

              <IconButton
                type="button"
                iconProps={{ icon: "ri:zoom-out-line", size: "md" }}
                color="darkGray"
                onClick={() => {
                  cropperRef.current?.zoom(-0.1);
                }}
              />

              <IconButton
                type="button"
                iconProps={{ icon: "ri:zoom-in-line", size: "md" }}
                color="darkGray"
                onClick={() => {
                  cropperRef.current?.zoom(0.1);
                }}
              />
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </TypicalDialog>
  );
};
