import React from "react";
import { type Alert } from "../api/types";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

interface AlertCardProps {
  alert: Alert;
}

const AlertCard = ({ alert }: AlertCardProps) => {
  return (
    <Card className="h-50 w-60 overflow-auto transition-transform duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg">
      <CardHeader>Name: {alert.senderName}</CardHeader>
      <CardContent>
        <p className="text-gray-600">Age: {alert.senderAge}</p>
        <div className="mt-4">
          <h3 className="font-medium text-gray-800">
            Files: {alert.files?.length}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
