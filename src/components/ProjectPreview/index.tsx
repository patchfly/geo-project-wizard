import GeoJSON from "ol/format/GeoJSON";
import { MapPreview } from "./components/MapPreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface ProjectPreviewProps {
  title: string;
  geoData: GeoJSON;
  restart: () => void;
}

const ProjectPreview = ({ title, restart, geoData }: ProjectPreviewProps) => {
  return (
    <Card className="w-full sm:max-w-[800px] max-sm:border-none max-sm:shadow-none">
      <CardHeader>
        <CardTitle>{`Project ${title} successfully created!`}</CardTitle>
        <CardDescription>See the preview of provided data:</CardDescription>
      </CardHeader>
      <CardContent>
        <MapPreview data={geoData} className="w-full w-max-[500px] h-[500px]" />
      </CardContent>
      <CardFooter className="flex justify-center" onClick={restart}>
        <Button>Start a new project</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectPreview;
