import { CgGym } from "react-icons/cg";
import { Avatar } from "@heroui/avatar";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-[80%] mt-5">
      <div className="flex gap-4 items-center text-3xl">
        <CgGym className="text-primary-500 text-5xl " />
        <div >
          <p >Blue Gym</p>
        </div>
      </div>
      <div>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="shadow-xs shadow-primary-500"/>
      </div>
    </div>
  );
};
export default Header;
