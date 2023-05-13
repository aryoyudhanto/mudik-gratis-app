import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Layout from "../components/Layout";
import { MiniCard, WrappingCard } from "../components/Card";

const Home = () => {
    ChartJS.register(
        CategoryScale,
        Tooltip,
        LinearScale,
        BarElement,
        Title,
        Legend
      );
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "January",
          },
        },
      };
    
      const dataGraph = {
        labels: ["Jawa Tengah", "Jawa Timur", "Sumatra", "Kalimantan", "Sulawesi", "NTT, NTB, Maluku dan Papua"],
        datasets: [
          {
            label: "Total Pemudik",
            data: [50, 45, 20, 15, 12, 8],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(108, 070, 117)",
              "rgb(045, 087, 044)",
              "rgb(108, 059, 042)",
              "rgb(078, 084, 082)",
              "rgb(254, 000, 000)",
              "rgb(030, 089, 069)",
              "rgb(037, 109, 123)",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
  return (
    <Layout>
      <WrappingCard judul="Dashboard" titleSet="font-bold">
        <div className="flex flex-col-reverse xl:flex-row gap-6 xl:gap-0 w-full">
          <div className="w-full">
            <div className="grid grid-cols-3 gap-4 xl:gap-0">
              <MiniCard
                parentSet="h-full"
                judul="total pemudik"
                titleSet="flex justify-center items-center text-sm xl:text-lg h-10 px-2"
              >
                <p className="text-2xl xl:text-5xl text-black font-bold text-center">
                  150
                  <span className="capitalize text-xs xl:text-xl font-semibold">
                    orang
                  </span>
                </p>
              </MiniCard>
              <MiniCard
                parentSet="h-full"
                judul="total rute"
                titleSet="flex justify-center items-center text-sm xl:text-lg h-10 px-2"
              >
                <p className="text-2xl xl:text-5xl text-black font-bold text-center">
                  30
                  <span className="capitalize text-xs xl:text-xl font-semibold">
                    rute
                  </span>
                </p>
              </MiniCard>
              <MiniCard
                parentSet="h-full"
                judul="total armada"
                titleSet="flex justify-center items-center text-sm xl:text-lg h-10 px-2"
              >
                <p className="text-2xl xl:text-5xl text-black font-bold text-center">
                  50
                  <span className="capitalize text-xs xl:text-xl font-semibold">
                    Armada
                  </span>
                </p>
              </MiniCard>
            </div>
            <div className="xl:mx-5 my-5 xl:my-10" id="graph-total-work">
              <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
                <div className="mx-10 mt-10">
                  <p className="capitalize text-lg font-extrabold text-center">
                    grafik total pemudik berdasarkan rute
                  </p>
                </div>
                <hr className="mx-10 my-3 border-[1.5px] border-sky" />
                <div className={`py-5 px-5`}>
                  <div className="w-full" id="graph-total-work-employee">
                    <Bar
                      className="!h-full !w-full"
                      options={options}
                      data={dataGraph}
                      id="graph-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default Home;
