import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";

interface TryAgainProps {
  reset: () => void;
}

export const TryAgain = ({ reset }: TryAgainProps) => {
  return (
    <Card className="w-full sm:max-w-[500px] max-sm:border-none max-sm:shadow-none">
      <CardHeader>
        <CardTitle className="text-red-600">Something went wrong.</CardTitle>
        <CardDescription>
          Sorry for the inconvenience. Please try again.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  );
};
