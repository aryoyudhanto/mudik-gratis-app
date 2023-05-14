import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import { tujuanBus, tujuanKapal, tujuanKereta } from "../utils/Tujuan";
import CustomInput from "../components/CustomInput";
import { bus, kereta, kapal } from "../utils/Seat";
import { WrappingCard } from "../components/Card";
import Layout from "../components/Layout";
import Button from "../components/Button";

const Mudik = () => {
  const [nama, setNama] = useState<string>("");
  const [telp, setTelp] = useState<string>("");
  const [armada, setArmada] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");
  const [tujuan, setTujuan] = useState<string>("");
  const [seat, setSeat] = useState<string[]>([]);
  const [noAntri, setNoAntri] = useState<number>()
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    generateRandomNumber()
    if (!cookie.token) {
      navigate("/home");
    }
  }, []);

  function orderTiket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nama && telp && armada && tanggal && tujuan) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Order Tiket sukses",
        showConfirmButton: true,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi form terlebih dahulu",
      });
    }
  }

  function seatPemudik(label: string) {
    if (seat.includes(label)) {
      setSeat(seat.filter((item) => item !== label));
    } else {
      setSeat([...seat, label]);
    }
  }

  function generateRandomNumber() {
    return setNoAntri(Math.floor(10000000 + Math.random() * 900000));
  }

  return (
    <Layout>
      <WrappingCard judul="Tiket Mudik" titleSet="font-bold">
        <div className="flex">
          <div className="flex w-full md:w-2/3">
            <form className="w-full" onSubmit={orderTiket}>
              <div className="px-2 md:px-5 lg:px-10">
                <div className="flex w-full mb-5">
                  <div className="flex items-center w-16 md:w-24">
                    <p className="font-semibold text-black text-center">Nama</p>
                  </div>
                  <CustomInput
                    inputSet="text-black w-56 md:w-2/3"
                    type="text"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex items-center w-16 md:w-24">
                    <p className="font-semibold text-black text-center">
                      No. Telp
                    </p>
                  </div>
                  <CustomInput
                    inputSet="text-black w-56 md:w-2/3"
                    type="text"
                    onChange={(e) => setTelp(e.target.value)}
                  />
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex items-center w-16 md:w-24">
                    <p className="font-semibold text-black text-center">
                      Armada
                    </p>
                  </div>
                  <select
                    className="select select-bordered border-sky text-black font-normal w-56 md:w-1/3"
                    onChange={(e) => setArmada(e.target.value)}
                  >
                    <option value="">Pilih Armada</option>
                    <option value="Bus">Bus</option>
                    <option value="Kereta">Kereta</option>
                    <option value="Kapal">Kapal</option>
                  </select>
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex items-center w-16 md:w-24">
                    <p className="font-semibold text-black text-center">
                      Tanggal
                    </p>
                  </div>
                  <CustomInput
                    inputSet="text-black w-56 md:w-1/3"
                    type="date"
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex items-center w-16 md:w-24">
                    <p className="font-semibold text-black text-center">
                      Tujuan
                    </p>
                  </div>
                  <select
                    className="select select-bordered border-sky text-black font-normal w-56 md:w-1/3"
                    onChange={(e) => setTujuan(e.target.value)}
                  >
                    <option value="">Pilih Tujuan</option>
                    {armada == "Bus"
                      ? tujuanBus.map((rute) => (
                          <option value={rute}>{rute}</option>
                        ))
                      : null || armada == "Kereta"
                      ? tujuanKereta.map((rute) => (
                          <option value={rute}>{rute}</option>
                        ))
                      : null || armada == "Kapal"
                      ? tujuanKapal.map((rute) => (
                          <option value={rute}>{rute}</option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex w-16 md:w-24">
                    <p className="font-semibold text-black text-center">Seat</p>
                  </div>
                  <div className="grid grid-cols-5 gap-3 border-2 rounded-2xl p-5">
                    {armada == "" ? (
                      <p>Pilih Armada</p>
                    ) : null || armada == "Bus" ? (
                      bus.map((label, index) =>
                        label == "" ||
                        label == "Pintu" ||
                        label == "Toilet" ||
                        label == "Supir" ? (
                          <label key={index} className="btn btn-ghost ">
                            {label}
                          </label>
                        ) : (
                          <label
                            key={index}
                            className="btn bg-gray-700"
                            onClick={() => seatPemudik(label)}
                          >
                            {label}
                          </label>
                        )
                      )
                    ) : null || armada == "Kereta" ? (
                      kereta.map((label, index) =>
                        label == "" || label == "Pintu" ? (
                          <label key={index} className="btn btn-ghost ">
                            {label}
                          </label>
                        ) : (
                          <label
                            key={index}
                            className="btn bg-gray-700"
                            onClick={() => seatPemudik(label)}
                          >
                            {label}
                          </label>
                        )
                      )
                    ) : null || armada == "Kapal" ? (
                      kapal.map((label, index) =>
                        label == "" || label == "Pintu" ? (
                          <label
                            key={index}
                            className={`btn btn-ghost`}
                            onClick={() => seatPemudik(label)}
                          >
                            {label}
                          </label>
                        ) : (
                          <label key={index} className={`btn bg-gray-700`}>
                            {label}
                          </label>
                        )
                      )
                    ) : null}
                  </div>
                </div>
                <div className="flex w-full mb-5">
                  <div className="flex w-16 md:w-24">
                    <p className="font-semibold text-black text-center">
                      Review
                    </p>
                  </div>
                  <div className="w-full h-72 border-2 rounded-2xl p-1">
                    <p className="text-center text-md md:text-xl font-bold mb-1">Tiket Mudik Gratis</p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">No Antri : <span className="text-base md:text-lg font-bold">{noAntri}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Nama : <span className="text-base md:text-lg font-bold">{nama}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Telp : <span className="text-base md:text-lg font-bold">{telp}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Armada : <span className="text-base md:text-lg font-bold">{armada}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Tanggal : <span className="text-base md:text-lg font-bold">{tanggal}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Tujuan : <span className="text-base md:text-lg font-bold">{tujuan}</span> </p>
                    <p className="ml-2 md:ml-5 mb-2 font-semibold text-sm md:text-base">Seat : <span className="text-base md:text-lg font-bold">{seat.join(",")}</span> </p>
                  </div>
                </div>
              </div>
              <Button
                buttonSet="w-1/3 rounded-lg bg-gray-700 font-bold py-3 hover:bg-blue-600 text-white border-0 mt-14"
                label="Order Tiket"
                type="submit"
              />
            </form>
          </div>
          <div className="hidden md:flex md:w-1/3 md:justify-center p-5">
            <div>
              <img
                src="https://pbs.twimg.com/media/DfVNfXbUwAA-oV9.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default Mudik;
