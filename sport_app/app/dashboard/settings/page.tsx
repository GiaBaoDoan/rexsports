import { SettingForm } from "@/components/forms/SettingForm";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";

const SettingPage = () => {
  return (
    <div>
      <h1 className="font-medium text-2xl mb-5">
        <span>Cài đặt tài khoản</span>
      </h1>
      <div className="grid grid-cols-3 gap-5 items-start">
        <SettingForm />
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default SettingPage;
