import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useTypeChart } from "./useTypeChart";
import { createQueryWrapper } from "../test/utils";
import { installFetchMock } from "../test/mockFetch";
import { makeTypeData } from "../test/factories";

describe("useTypeChart", () => {
  it("carrega os dados dos tipos pedidos", async () => {
    installFetchMock({
      types: {
        fire: makeTypeData("fire", { double_damage_to: ["grass"] }),
        flying: makeTypeData("flying", { double_damage_from: ["rock"] }),
      },
    });

    const { result } = renderHook(() => useTypeChart(["fire", "flying"]), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.typeChart.size).toBe(2);
    expect(result.current.typeChart.get("fire")?.name).toBe("fire");
  });

  it("deduplica nomes repetidos", async () => {
    const fetchMock = installFetchMock({
      types: { fire: makeTypeData("fire") },
    });

    const { result } = renderHook(() => useTypeChart(["fire", "fire"]), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("não está pronto quando a lista é vazia", () => {
    installFetchMock({});
    const { result } = renderHook(() => useTypeChart([]), {
      wrapper: createQueryWrapper(),
    });
    expect(result.current.isReady).toBe(false);
  });
});
