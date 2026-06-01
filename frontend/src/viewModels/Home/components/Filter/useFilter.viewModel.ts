import { useGetProductCategoriesQuery } from "../../../../shared/queries/product/use-getProducts.queries";
import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";
import { useFilterStore } from "../../../../shared/store/use-filter-store";

export default function useFilterViewModel() {
    const { close } = useBottomSheetStore();
    const { data: productCategories, isLoading } = useGetProductCategoriesQuery();

    const { updateFilter, filterState, applyFilters, resetFilter } = useFilterStore()

  const handleValueMaxChange = (value: number) => {
    updateFilter({ key: 'valueMax', value: value })
  }

  const handleValueMinChange = (value: number) => {
    updateFilter({ key: 'valueMin', value: value })
  }

  const handleCategoryToggle = (categoryId: number) => {
    const categoryAlreadyInArray =
      filterState.selectedCategories.includes(categoryId)

    if (categoryAlreadyInArray) {
      updateFilter({
        key: 'selectedCategories',
        value: filterState.selectedCategories.filter((id) => id !== categoryId),
      })
    } else {
      updateFilter({
        key: 'selectedCategories',
        value: [...filterState.selectedCategories, categoryId],
      })
    }
  }

  const handleApplyFilters = () => {
    applyFilters();
    close();
  }

  const handleResetFilter = () => {
    resetFilter();
    close();
  }
  return {
    productCategories,
    isLoading,
    handleValueMaxChange,
    handleValueMinChange,
    handleCategoryToggle,
    selectedCategories: filterState.selectedCategories,
    close,
    handleApplyFilters,
    handleResetFilter
  }
}
