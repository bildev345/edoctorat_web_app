import { useMutation } from "@tanstack/react-query";
import {sendBulkNotifications} from "../../api/directeurLaboApi/notification";
export const useSendNotifications = () => {
  return useMutation({
    mutationFn: sendBulkNotifications,
  });
};
