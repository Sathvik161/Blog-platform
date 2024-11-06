import { Appbar } from "../components/Appbar";
import { PostList } from "./PostList"; // Import the PostList component

export const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
                <PostList /> {/* Render the PostList component */}
            </div>
        </div>
    );
};
