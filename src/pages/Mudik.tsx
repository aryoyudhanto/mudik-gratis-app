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
  const [seat, setSeat] = useState<string[]>();
  const [color, setColor] = useState<string>("gray")
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.token) {
      navigate("/home");
    }
  }, []);

  function toogleColor() {
    if (color === "gray") {
      setColor("blue");
    }
    if (color === "blue") {
      setColor("gray");
    }
  }

  function orderTiket(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Order Tiket sukses",
      showConfirmButton: true,
      timer: 2000,
    });
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
                          <label key={index} className="btn">
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
                          <label key={index} className="btn">
                            {label}
                          </label>
                        )
                      )
                    ) : null || armada == "Kapal" ? (
                      kapal.map((label, index) =>
                        label == "" || label == "Pintu" ? (
                          <label key={index} className={`btn btn-ghost`}>
                            {label}
                          </label>
                        ) : (
                          <label key={index} className={`btn bg-${color}-700`} onClick={()=>toogleColor()}>
                            {label}
                          </label>
                        )
                      )
                    ) : null}
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
