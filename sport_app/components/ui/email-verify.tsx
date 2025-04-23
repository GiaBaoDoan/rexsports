import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface EmailVerifiedProps {
  isVerified: boolean;
  email: string;
}

const EmailVerified = ({ isVerified, email }: EmailVerifiedProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {isVerified ? (
          <FaCheckCircle className="text-green-500" size={16} />
        ) : (
          <FaTimesCircle className="text-red-500" size={16} />
        )}
        <p
          className={`text-sm ${
            isVerified ? "text-green-600" : "text-red-600"
          }`}
        >
          {email}
        </p>
      </div>
    </div>
  );
};

export default EmailVerified;
