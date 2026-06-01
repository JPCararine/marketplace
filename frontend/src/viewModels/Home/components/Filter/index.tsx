import FilterView from "./Filter.view";
import useFilterViewModel from "./useFilter.viewModel";

export default function Filter() {
    const props = useFilterViewModel();

    return <FilterView {...props} />
}