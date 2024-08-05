import Link from 'next/link';
import ToggleMode from './ToggleMode';
import MainNavLinks from './MainNavLinks';

function MainNav() {
  return (
    <div className="flex justify-between">
      <MainNavLinks />
      <div className="flex items-center gap-2">
        <Link href="/users">Logout</Link>
        <ToggleMode />
      </div>
    </div>
  );
}

export default MainNav;
