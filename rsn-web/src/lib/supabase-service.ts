import { supabase } from "./supabase";

/**
 * Save a contact form submission to Supabase
 */
export async function addContactSubmission(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    try {
        const { data: result, error } = await supabase
            .from("submissions")
            .insert([data]);

        if (error) throw error;
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Supabase Submission Error:", error.message || error);
        return { success: false, error };
    }
}

/**
 * Fetch data from a Supabase table
 */
export async function getTableData(tableName: string) {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select("*");

        if (error) throw error;
        return data || [];
    } catch (error: any) {
        console.error(`Supabase Fetch Error (${tableName}):`, error.message || error);
        return [];
    }
}/**
 * Fetch a single portfolio item by ID
 */
export async function getPortfolioItem(id: string | number) {
    try {
        const { data, error } = await supabase
            .from("portfolio")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    } catch (error: any) {
        console.error(`Supabase Fetch Error (portfolio item ${id}):`, error.message || error);
        return null;
    }
}

/**
 * Fetch all site settings as a key-pair object
 */
export async function getSiteSettings() {
    try {
        const { data, error } = await supabase
            .from("site_settings")
            .select("key, value");

        if (error) throw error;

        // Convert array to object { key: value }
        return data.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    } catch (error: any) {
        console.error("Supabase Fetch Error (site_settings):", error.message || error);
        return {};
    }
}
