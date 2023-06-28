import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button, Input } from "../../../../core";
import Box from "../../../../core/ui/components/box";
import { usePageContext } from "../../../../core/utils/usePageContext";
import { UserVideoUploadService } from "../../infras/services/user-video.service";

interface IUserVideoForm {}

const UserVideoForm: React.FC<IUserVideoForm> = () => {
  const { sendMessage } = usePageContext();
  const [error, setError] = useState<string>();

  return (
    <Box className="flex flex-col">
      <Box as="label" className="text-red-500 mb-4">
        {error}
      </Box>
      <Formik
        initialValues={{
          youtubeurl: "",
        }}
        validationSchema={Yup.object({
          youtubeurl: Yup.string().required("Please input a youtube video"),
        })}
        onSubmit={(values) => {
          const videoService = new UserVideoUploadService();
          videoService
            .excute({ link: values.youtubeurl })
            .then((res) => {
              sendMessage(JSON.stringify({ message: res.data.title }));
              location.href = "/";
            })
            .catch((error) => {
              const reError: any = JSON.parse(error);
              setError(reError?.message);
            });
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form
            className="w-[500px] border border-gray-300 relative px-5 py-10 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <Box as="label" className="absolute -top-[12px] bg-white">
              Share a Youtube video
            </Box>
            <Box className="flex">
              <Box className="flex-[1] mt-1">Youtube URL:</Box>
              <Box className="flex-[2] flex flex-col gap-2">
                <Input
                  type="text"
                  id="new-youtubeurl"
                  name="youtubeurl"
                  placeholder="Input your a youtube video"
                  value={values.youtubeurl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button type="submit" variant="primary">
                  Share
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default UserVideoForm;
