import { HomeSwitchButton, Logo } from "./index";
export const HomeNaviagtion = () => {
  return (
    <div className="p-5 w-[205px] flex flex-col gap-10">
      <Logo />
      <div className="flex flex-col gap-3">
        <HomeSwitchButton name="food" />
        <HomeSwitchButton name="order" />
        <HomeSwitchButton name="settings" />
      </div>
    </div>
  );
};
