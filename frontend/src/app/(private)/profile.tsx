import ProfileView from "../../viewModels/ProductDetail/Profile/Profile.view";
import useProfileViewModel from "../../viewModels/ProductDetail/Profile/useProfile.viewModel"

export default function Profile() {

    const props = useProfileViewModel();
    
    return (
        <ProfileView {...props} />
    )
}