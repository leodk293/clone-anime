"use client";
import { useState, useEffect, use } from "react";
import { Book } from "lucide-react";
import ReadMore from "@/app/components/readMore";
import Loader from "@/app/components/loader/Loader";
import SearchManga from "@/app/components/SearchManga";

const InfoItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="font-bold flex flex-row gap-2 text-sm sm:text-base md:text-lg flex-wrap">
      {label}: <span className="text-gray-600">{value}</span>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className=" flex flex-col">
    <div className="flex flex-row gap-2">
      <div className="border border-transparent bg-black p-1">
        <Book color="#ffffff" />
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <span className="w-full h-[1px] bg-gray-900" />
  </div>
);

export default function Character({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.character_id;
  const [characterData, setCharacterData] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  const fetchCharacterData = async () => {
    setCharacterData({
      error: false,
      data: undefined,
      loading: true,
    });
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters/${id}/full`
      );
      if (!response.ok) {
        throw new Error(`An error has occurred : ${response.status}`);
      }
      const result = await response.json();
      setCharacterData({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setCharacterData({
        error: true,
        data: undefined,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [id]);

  if (characterData.error) {
    return (
      <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center my-8">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (characterData.loading) {
    return (
      <div className="w-full flex justify-center py-16 md:h-[20rem]">
        <Loader />
      </div>
    );
  }

  if (!characterData.data) return null;

  return (
    <main className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 break-words">
              {characterData.data.name}
            </h1>

            <div className="flex flex-col gap-3 sm:gap-5 md:mt-3">
              <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-8 lg:gap-10">
                <div className="self-start relative group">
                  <img
                    className="self-start border border-gray-700 object-cover md:h-[350px] w-full"
                    src={characterData.data.images.jpg.image_url}
                    alt={characterData.data.name}
                  />
                </div>

                <div className="font-bold self-center sm:self-start flex flex-col gap-2 sm:gap-3 md:gap-4 w-full sm:flex-1">
                  <InfoItem label="Name" value={characterData.data.name} />
                  <InfoItem
                    label="Romaji"
                    value={characterData.data.name_kanji}
                  />
                  <InfoItem
                    label="Nickname(s)"
                    value={
                      characterData.data.nicknames &&
                      characterData.data.nicknames.length > 0
                        ? characterData.data.nicknames.join(", ")
                        : "None"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-10">
              <SectionHeader title={`About ${characterData.data.name}`} />
              <div className="text-gray-700 font-semibold mt-2 sm:mt-4 text-sm sm:text-base">
                {characterData.data.about ? (
                  <ReadMore text={characterData.data.about} maxLength={250} />
                ) : (
                  <p className="text-gray-500 italic">
                    No information available
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 mt-8 lg:mt-0">
            <SearchManga />
          </div>
        </div>
      </div>
    </main>
  );
}
