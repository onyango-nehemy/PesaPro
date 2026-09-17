import type { Jar } from "@/data/jars";

interface JarsOverviewProps{
    jars:Jar[];
}

export default function JarsOverview({jars}:JarsOverviewProps){
    const totalSaved=jars.reduce((sum,jar)=>sum + jar.saved,0);
    const totalGoal=jars.reduce((sum,jar)=> sum + jar.goal,0);
    const overallProgress=totalGoal>0 ? (totalSaved/totalGoal) * 100 : 0;

    const formattedSaved=new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
    }).format(totalSaved);

    const formattedGoal=new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(totalGoal)
    return(
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900">Overview</h2>
            <p className="mt-1 text-sm text-gray-500">Your total savings progress across all jars</p>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xs text-gray-400">Total Saved</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{formattedSaved}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Total Goal</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{formattedGoal}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Progress</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{overallProgress.toFixed(1)}%</p>
                </div>
            </div>

            <div className="mt-4 h-2 w-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-green-900"
                    style={{width:`${Math.min(overallProgress,100)}%`}}
                ></div>
            </div>
        </div>
    )
}