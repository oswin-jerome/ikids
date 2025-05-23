import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

const SearchProduct = ({ onChange, val }: { onChange: (val: number) => void; val: number | null }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [value, setValue] = useState('');
    const [searchWord, setSearchWord] = useState('');
    const [open, setOpen] = useState(false);
    // useEffect(() => {
    //     search();
    // }, []);

    function searchProducts(searchWord: string) {
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            fetch(
                route('api.products', {
                    _query: {
                        name: searchWord,
                    },
                }),
            )
                .then((res) => res.json())
                .then(setProducts)
                .catch((err) => {
                    if (err.name !== 'AbortError') {
                        console.error('Fetch error:', err);
                    }
                });
        }, 300); // debounce: 300ms

        return () => {
            controller.abort();
            clearTimeout(timeout);
        };
    }

    useEffect(() => {
        const cleanup = searchProducts(searchWord);
        return cleanup;
    }, [searchWord]);

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Input className="text-left" placeholder="Select a product" value={val ? value : ''} />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <Input
                        onChange={(e) => {
                            setSearchWord(e.target.value);
                        }}
                    />
                    <ScrollArea className="h-72">
                        <div className="h-72">
                            {products.map((product) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setValue(product.name + ' | current stock: ' + product.current_stock);
                                            onChange(product.id);
                                            setOpen(false);
                                        }}
                                        className={cn('cursor-pointer rounded p-2 hover:bg-black/10', {
                                            'bg-accent': val == product.id,
                                        })}
                                        key={product.id}
                                    >
                                        {product.name}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchProduct;
