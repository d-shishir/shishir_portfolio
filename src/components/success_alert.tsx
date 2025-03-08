import { Alert } from "@/components/ui/alert";

function AlertSuccess() {
  return (
    <Alert layout="row">
      <p className="text-sm">Message sent successfully!</p>
    </Alert>
  );
}

export { AlertSuccess };
