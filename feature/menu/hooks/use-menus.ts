import { useQuery } from "@tanstack/react-query";
import { MenuService } from "../services/menu.service";

export const useMenus = ({
	category,
	query,
}: {
	category?: string;
	query?: string;
} = {}) => {
	return useQuery({
		queryKey: ["menus", category, query],
		queryFn: () => MenuService.getMenus({ category, query }),
		staleTime: 1000 * 60 * 10, // 10 minutes
	});
};
