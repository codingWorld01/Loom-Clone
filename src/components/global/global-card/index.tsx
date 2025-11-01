import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, children, description, footer }: Props) => {
  return (
    <Card className="bg-transparent w-full mt-0">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#9D9D9D]">{title}</CardTitle>
        <CardDescription className="text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className="">{children}</div>}
      {footer && <CardFooter className="">{footer}</CardFooter>}
    </Card>
  );
};

export default GlobalCard;
