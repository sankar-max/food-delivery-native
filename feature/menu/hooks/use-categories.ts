import { useQuery } from "@tanstack/react-query"
import { MenuService } from "../services/menu.service"

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => MenuService.getCategories(),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
