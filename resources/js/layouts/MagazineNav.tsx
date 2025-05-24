import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const MagazineNav = () => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 text-sm">
                    Magazines
                    <ChevronDown
                        size={14}
                        className={cn('transition-transform', {
                            'rotate-180': open,
                        })}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuItem asChild>
                    <Link href={route('skippy')}>
                        <div>
                            <p className="font-bold">Skippy</p>
                            <p className="text-sm text-slate-500">Skippy - the Kids Activity Magazine</p>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route('scikids')}>
                        <div>
                            <p className="font-bold">Scikids</p>
                            <p className="text-sm text-slate-500">SciKids - the Science Magazine for Young Minds</p>
                        </div>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MagazineNav;
